import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 space-y-8">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          We are a team of developers who are passionate about creating tools that help people
          work smarter, not harder. Our mission is to build accessible, powerful, and intuitive
          tools for everyone.
        </p>
      </section>

      <Separator className="my-8" />

      {/* Our Mission */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Empowering Creators</CardTitle>
              <CardDescription>
                We believe in democratizing technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our tools are designed to empower creators of all skill levels to build,
                innovate, and solve problems efficiently. We strive to remove technical
                barriers and make powerful functionality accessible to everyone.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Open Innovation</CardTitle>
              <CardDescription>
                Building in public with transparency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We embrace open innovation and believe in building in public. Our development
                process is transparent, and we actively seek feedback from our community to
                continuously improve our tools and services.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Our Technology */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Our Technology</h2>
        <p className="text-lg text-muted-foreground max-w-3xl">
          We build with modern, cutting-edge technologies to ensure our tools are fast,
          reliable, and scalable.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline">Next.js</Badge>
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Tailwind CSS</Badge>
          <Badge variant="outline">Shadcn UI</Badge>
          <Badge variant="outline">Cloudflare Workers</Badge>
          <Badge variant="outline">DrizzleORM</Badge>
          <Badge variant="outline">D1 Database</Badge>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Team */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Our Team</h2>
        <p className="text-lg text-muted-foreground max-w-3xl">
          We&apos;re a small but dedicated team of developers, designers, and product thinkers
          who are passionate about building tools that make a difference.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {/* Team member cards would go here */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Jane Doe</CardTitle>
              <CardDescription>Founder & Lead Developer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Full-stack developer with a passion for building intuitive user interfaces
                and scalable backend systems.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>John Smith</CardTitle>
              <CardDescription>UX Designer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Experienced designer focused on creating beautiful, accessible, and
                user-friendly experiences.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Alex Johnson</CardTitle>
              <CardDescription>Backend Engineer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Cloud infrastructure expert specializing in serverless architectures
                and database optimization.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Contact */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">Get in Touch</h2>
        <p className="text-lg text-muted-foreground max-w-3xl">
          We&apos;d love to hear from you! Whether you have questions, feedback, or just want to say hello,
          don&apos;t hesitate to reach out.
        </p>

        <div className="mt-4">
          <a
            href="mailto:contact@example.com"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
