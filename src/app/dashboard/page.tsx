import { FarmGrid } from "@/components/game/farm-grid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FarmPage() {
  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">My Farm</CardTitle>
          <CardDescription>
            Click on an empty plot to plant a crop. Click on a ready crop to harvest it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FarmGrid />
        </CardContent>
      </Card>
    </div>
  );
}
