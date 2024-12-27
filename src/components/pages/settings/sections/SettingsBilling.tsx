import React from 'react';
import { CreditCard } from 'lucide-react';

export function SettingsBilling() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Billing</h2>
      <div className="rounded-lg border bg-card divide-y">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Current Plan</h3>
              <p className="text-sm text-muted-foreground">Professional Plan</p>
            </div>
            <span className="text-sm font-medium">$29/month</span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5" />
              <div>
                <p className="font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
              </div>
            </div>
            <button className="text-sm text-primary hover:underline">
              Update
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <button className="w-full px-4 py-2 rounded-md border text-sm">
              Pause Subscription
            </button>
            <button className="w-full px-4 py-2 rounded-md border text-sm text-destructive hover:bg-destructive/5">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}