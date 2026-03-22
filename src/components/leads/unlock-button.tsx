
"use client"

import { useState } from 'react'
import { Lock, Unlock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProspectStore } from '@/lib/store'
import { useToast } from '@/hooks/use-toast'
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
} from "@/components/ui/alert-dialog"

interface UnlockButtonProps {
  leadId: string;
  isUnlocked: boolean;
  onUnlock?: () => void;
}

export function UnlockButton({ leadId, isUnlocked, onUnlock }: UnlockButtonProps) {
  const { unlockLead, credits } = useProspectStore()
  const { toast } = useToast()
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handleUnlock = async () => {
    setIsUnlocking(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const success = unlockLead(leadId)
    
    if (success) {
      toast({
        title: "Contact Unlocked",
        description: "1 credit has been deducted from your balance.",
      })
      onUnlock?.()
    } else {
      toast({
        variant: "destructive",
        title: "Insufficient Credits",
        description: "Please top up your credits to unlock more contacts.",
      })
    }
    setIsUnlocking(false)
  }

  if (isUnlocked) {
    return (
      <Button variant="ghost" size="sm" className="text-green-400 gap-2 cursor-default hover:bg-transparent">
        <Unlock className="h-4 w-4" />
        Unlocked
      </Button>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/10">
          <Lock className="h-4 w-4" />
          Unlock Contact
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle>Unlock Lead Contact?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will consume 1 credit. You currently have {credits} credits remaining.
            Unlocking reveals the email and phone number for this lead.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-muted">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleUnlock}
            disabled={isUnlocking}
            className="bg-primary hover:bg-primary/90"
          >
            {isUnlocking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Unlock"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
