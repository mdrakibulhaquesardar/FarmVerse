import Image from 'next/image';
import { AuthForm } from '@/components/auth/auth-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-barn');

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              {heroImage && 
                <div className="relative mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    fill
                    className="object-cover"
                  />
                </div>
              }
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                    Welcome to HarvestWeb
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Plant, grow, and harvest your way to success. Manage your virtual farm, trade goods at the marketplace, and build the farm of your dreams.
                  </p>
                </div>
                <div className="w-full max-w-sm">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl">Start Your Farm</CardTitle>
                      <CardDescription>
                        Create an account or log in to continue.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AuthForm />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center py-4 bg-primary/10">
        <p className="text-sm text-muted-foreground">© 2024 HarvestWeb. All rights reserved.</p>
      </footer>
    </div>
  );
}
