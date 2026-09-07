private function isProductVisible($product): bool 
{ 
    if (!$product || !$product->user) { 
        return false; 
    } 

    $isOldUser = $this->isOldUser($product->user_id); 
     
    if ($isOldUser) { 
        return true; 
    } 
     
    return $this->hasActiveSubscription($product->user_id); 
} 

private function applySubscriptionFilter($query) 
{ 
    $cutoffDate = Carbon::create(2025, 1, 1); 
     
    return $query->where(function($q) use ($cutoffDate) { 
        $q->where('users.created_at', '<', $cutoffDate) 
          ->orWhereHas('user.subscription', function($sq) { 
              $sq->where('status', \App\Enums\SubscriptionStatus::ACTIVE) 
                 ->where('period_end', '>', now()); 
          }); 
    }); 
}