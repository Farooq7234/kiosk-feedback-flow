
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  answeredCount: number;
  totalCount: number;
}

const ConfirmationDialog = ({
  open,
  onConfirm,
  onCancel,
  answeredCount,
  totalCount,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <DialogTitle className="text-2xl">Submit Feedback?</DialogTitle>
          <DialogDescription className="text-lg space-y-2">
            <p>You've completed the survey!</p>
            <p className="text-sm text-gray-500">
              Answered {answeredCount} of {totalCount} questions
            </p>
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
          <Button
            onClick={onConfirm}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
