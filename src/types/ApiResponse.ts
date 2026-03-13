import {Message} from '@/model/user.model';

export interface ApiResponse{
    sucess: boolean,
    message: string;
    isAcceptingMessage?: boolean
    messages?: Array<Message>
}