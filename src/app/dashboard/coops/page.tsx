import { AnimalCoops } from "@/components/game/animal-coops";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoopsPage() {
  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Animal Coops</CardTitle>
          <CardDescription>
            Buy chickens to fill your coops and collect eggs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimalCoops />
        </CardContent>
      </Card>
    </div>
  );
}
