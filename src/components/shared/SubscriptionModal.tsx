import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, DollarSign, Star } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
}

const subscriptionPlans = [
  {
    name: 'Daily',
    description: 'Pay as you go. Ideal for short-term access.',
    price: '$2/day',
    icon: <DollarSign className="w-5 h-5 text-blue-600" />,
  },
  {
    name: 'Monthly',
    description: 'Recommended for regular usage.',
    price: '$20/month',
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    recommended: true,
  },
  {
    name: 'Yearly',
    description: 'Best value for long-term use.',
    price: '$200/year',
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
];

const SubscriptionModal: React.FC<Props> = ({ open, onClose, onSelect }) => {
  const [selected, setSelected] = useState<string>('');

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      setSelected('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">Choose Your Subscription</DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            Select the plan that best fits your business needs.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelected(plan.name)}
              className={`cursor-pointer border p-4 rounded-xl transition-all ${
                selected === plan.name
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {plan.icon}
                  <div>
                    <h4 className="font-medium">{plan.name}</h4>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{plan.price}</span>
              </div>
              {plan.recommended && (
                <div className="mt-2 text-xs text-yellow-600 font-semibold">⭐ Recommended</div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="ghost" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selected}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
