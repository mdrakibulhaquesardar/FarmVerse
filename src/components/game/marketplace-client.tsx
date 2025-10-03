"use client";

import { useState, useEffect } from 'react';
import { useGameState, useGameDispatch } from '@/context/game-context';
import { ALL_ITEMS } from '@/lib/game-data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MarketplaceClient() {
    const state = useGameState();
    const dispatch = useGameDispatch();
    const { toast } = useToast();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);
    const [priceReasoning, setPriceReasoning] = useState("");

    const playerInventory = Object.entries(state.inventory).filter(([, quantity]) => quantity > 0);

    const calculatePrice = (itemId: string) => {
        const item = ALL_ITEMS[itemId];
        if (!item) return;

        const supply = state.inventory[itemId] || 1;
        // Simulate demand without AI. Generate a random number for demand.
        const demand = Math.floor(Math.random() * 50) + 10; 
        
        let price = item.basePrice;
        let reasoning = "The price is based on the current market conditions. ";

        if (demand > supply * 1.5) {
            price *= 1.25; // Price increases by 25% if demand is much higher than supply
            reasoning += "Demand is high, so the price has increased.";
        } else if (supply > demand * 1.5) {
            price *= 0.75; // Price decreases by 25% if supply is much higher than demand
            reasoning += "There's a lot of supply, so the price has decreased.";
        } else {
             reasoning += "Supply and demand are relatively balanced.";
        }

        const finalPrice = Math.max(1, parseFloat(price.toFixed(2))); // Ensure price is at least 1
        setCurrentPrice(finalPrice);
        setPriceReasoning(reasoning);
    };
    
    const handleSell = () => {
        if (!selectedItem || currentPrice === null) return;
        
        dispatch({
            type: 'SELL_ITEM',
            itemId: selectedItem,
            quantity: 1, // Sell one at a time for simplicity
            price: currentPrice,
        });

        toast({
            title: 'Item Sold!',
            description: `You sold 1 ${ALL_ITEMS[selectedItem].name} for ${currentPrice} coins.`,
        });
        setIsDialogOpen(false);
    };

    const openSellDialog = (itemId: string) => {
        setSelectedItem(itemId);
        setIsDialogOpen(true);
        setCurrentPrice(null);
        calculatePrice(itemId);
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Base Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {playerInventory.length > 0 ? playerInventory.map(([itemId, quantity]) => {
                        const item = ALL_ITEMS[itemId];
                        return (
                            <TableRow key={itemId}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <item.icon className="h-6 w-6" />
                                    {item.name}
                                </TableCell>
                                <TableCell>{quantity}</TableCell>
                                <TableCell>{item.basePrice} coins</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => openSellDialog(itemId)}>Sell</Button>
                                </TableCell>
                            </TableRow>
                        );
                    }) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center h-24">
                                Your inventory is empty. Harvest some crops or collect products to sell!
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {selectedItem && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="font-headline">Sell {ALL_ITEMS[selectedItem].name}</DialogTitle>
                            <DialogDescription>
                                Prices fluctuate based on market supply and demand.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            {currentPrice === null && (
                                <div className="flex items-center justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <span className="ml-2">Calculating price...</span>
                                </div>
                            )}
                            {currentPrice !== null && (
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Current Market Price</p>
                                        <p className="text-4xl font-bold text-primary">{currentPrice.toFixed(2)}</p>
                                        <p className="text-xs text-muted-foreground">coins per unit</p>
                                    </div>
                                    <Alert>
                                        <Info className="h-4 w-4" />
                                        <AlertTitle>Market Analysis</AlertTitle>
                                        <AlertDescription>
                                            {priceReasoning}
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSell} disabled={currentPrice === null}>
                                Sell 1 Unit for {currentPrice ? currentPrice.toFixed(2) : '...'} coins
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
