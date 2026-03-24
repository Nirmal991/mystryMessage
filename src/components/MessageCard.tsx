import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@react-email/components';
import { X } from 'lucide-react';
import { Message } from '@/model/user.model';
import { useToast } from './ui/use-toast';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

type MessageCardProps = {
  message: Message,
  onMessageDelete: (messageId: string) => void
}


function MessageCard({message, onMessageDelete}: MessageCardProps) {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
    toast({
      title: response.data.message
    })
    onMessageDelete(message._id.toString())
  }
  return (
    <Card className="card-bordered">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle></CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button >
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm">
          {/* {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')} */}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}

export default MessageCard
