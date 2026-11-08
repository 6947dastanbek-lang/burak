import OrderItemModel from "../schema/OrderItem.model";
import OrderModel from "../schema/Order.model";
import {
    Order,
    OrderInquiry,
    OrderItemInput,
    OrderUpdateInput,
} from "../libs/types/order";
import { Member } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { shapeIntoMongooseObjecId } from "../libs/config";
import { ObjectId } from "mongoose";
import MemberModel from "../schema/Member.model";
import MemberService from "./Member.service";
import { OrderStatus } from "../libs/enums/order.enum";
class OrderService {
    private readonly orderModel;
    private readonly orderItemModel;
    private readonly memberService;
    constructor() {
        this.orderModel = OrderModel;
        this.orderItemModel = OrderItemModel;
        this.memberService = new MemberService();
    }

    public async createOrder(
        member: Member,
        input: OrderItemInput[],
    ): Promise<Order> {
        const memberId = shapeIntoMongooseObjecId(member._id);
        const amount = input.reduce(
            (accumulator: number, item: OrderItemInput) => {
                return accumulator + item.itemPrice * item.itemQuantity;
            },
            0,
        );
        const delivery = amount < 100 ? 5 : 0;

        try {
            const newOrder: Order = await this.orderModel.create({
                orderTotal: amount + delivery,
                orderDelivery: delivery,
                memberId: memberId,
            });
            const orderId = newOrder._id;
            console.log("orderId:", orderId);
            await this.recordOrderItem(orderId, input);

            return newOrder;
        } catch (err) {
            console.log("Error, model:createOrder:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    private async recordOrderItem(
        orderId: ObjectId,
        input: OrderItemInput[],
    ): Promise<void> {
        const promisedList = input.map(async (item: OrderItemInput) => {
            item.orderId = orderId;
            item.productId = shapeIntoMongooseObjecId(item.productId);
            await this.orderItemModel.create(item);
            return "INSERTED";
        });
        console.log("promisedList:", promisedList);
        const orderItemsState = await Promise.all(promisedList);
        console.log("orderItemsState:", orderItemsState);
    }
    public async getMyOrders(
        member: Member,
        inquiry: OrderInquiry,
    ): Promise<Order[]> {
        const memberId = shapeIntoMongooseObjecId(member._id);
        const matches = {
            memberId: memberId,
            orderStatus: inquiry.orderStatus,
        };
        const result = await this.orderModel
            .aggregate([
                { $match: matches },
                { $sort: { updatedAt: -1 } },
                { $skip: (inquiry.page - 1) * inquiry.limit },
                { $limit: inquiry.limit },
                {
                    $lookup: {
                        localField: "_id",
                        from: "orderItems",
                        foreignField: "orderId",
                        as: "orderItems",
                    },
                },
                {
                    $lookup: {
                        localField: "orderItems.productId",
                        from: "products",
                        foreignField: "_id",
                        as: "productData",
                    },
                },
            ])
            .exec();
        if (!result)
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        return result;
    }
    public async updateOrder(
        member: Member,
        input: OrderUpdateInput,
    ): Promise<Order> {
        const memberId = shapeIntoMongooseObjecId(member._id),
            orderId = shapeIntoMongooseObjecId(input.orderId),
            orderStatus = input.orderStatus;

        const result = await this.orderModel
            .findOneAndUpdate(
                {
                    memberId: memberId,
                    _id: orderId,
                },
                { orderStatus: orderStatus },
                { new: true },
            )
            .exec();

        if (!result)
            throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
        //order ststus pouse =>proccess
        if (orderStatus === OrderStatus.PROCESS) {
            await this.memberService.addUserPoint(member, 1);
        }
        return result;
    }
}

export default OrderService;
