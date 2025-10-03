"use client";

import { useState } from 'react';
import { useGameState, useGameDispatch } from '@/context/game-context';
import { ALL_ITEMS } from '@/lib/game-data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getDynamicPriceAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, TrendingUp, Info } from 'lucide-react';
import type { DynamicPriceOutput } from '@/ai/flows/dynamic-marketplace-pricing';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export default function MarketplaceClient() {
    const state = useGameState();
    const dispatch = useGameDispatch();
    const { toast } = useToast();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [isLoadingPrice, setIsLoadingPrice] = useState(false);
    const [priceData, setPriceData] = useState<DynamicPriceOutput | null>(null);

    const playerInventory = Object.entries(state.inventory).filter(([, quantity]) => quantity > 0);

    const handleGetPrice = async (itemId: string) => {
        const item = ALL_ITEMS[itemId];
        if (!item) return;

        setIsLoadingPrice(true);
        setPriceData(null);
        try {
            const result = await getDynamicPriceAction({
                item: item.name,
                supply: state.inventory[itemId] || 0,
                demand: Math.floor(Math.random() * 50) + 10, // Simulated demand
                basePrice: item.basePrice,
            });
            setPriceData(result);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error getting price',
                description: 'Could not fetch the dynamic price. Please try again.',
            });
        } finally {
            setIsLoadingPrice(false);
        }
    };

    const handleSell = () => {
        if (!selectedItem || !priceData) return;
        
        dispatch({
            type: 'SELL_ITEM',
            itemId: selectedItem,
            quantity: 1, // Sell one at a time for simplicity
            price: priceData.suggestedPrice,
        });

        toast({
            title: 'Item Sold!',
            description: `You sold 1 ${ALL_ITEMS[selectedItem].name} for ${priceData.suggestedPrice} coins.`,
        });
        setIsDialogOpen(false);
    };

    const openSellDialog = (itemId: string) => {
        setSelectedItem(itemId);
        setIsDialogOpen(true);
        setPriceData(null);
        handleGetPrice(itemId);
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
                                Your inventory is empty. Harvest some crops to sell!
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
                            {isLoadingPrice && (
                                <div className="flex items-center justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <span className="ml-2">Calculating price...</span>
                                </div>
                            )}
                            {priceData && (
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Suggested Price</p>
                                        <p className="text-4xl font-bold text-primary">{priceData.suggestedPrice.toFixed(2)}</p>
                                        <p className="text-xs text-muted-foreground">coins per unit</p>
                                    </div>
                                    <Alert>
                                        <Info className="h-4 w-4" />
                                        <AlertTitle>Economist's Note</AlertTitle>
                                        <AlertDescription>
                                            {priceData.reasoning}
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSell} disabled={isLoadingPrice || !priceData}>
                                Sell 1 Unit for {priceData ? priceData.suggestedPrice.toFixed(2) : '...'} coins
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
