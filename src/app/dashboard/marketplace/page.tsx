import MarketplaceClient from "@/components/game/marketplace-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketplacePage() {
    return (
        <div className="container mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Marketplace</CardTitle>
                    <CardDescription>
                        Sell your harvested crops and animal products. Prices are determined by supply and demand.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <MarketplaceClient />
                </CardContent>
            </Card>
        </div>
    );
}
