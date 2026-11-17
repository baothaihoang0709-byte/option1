import { Container, Button } from "@/components/common";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-24 sm:py-32">
      <Container className="text-center">
        <p className="text-base font-bold text-blue-600 uppercase tracking-wide">
          404 Error
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-slate-600 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved. Please
          navigate using the menu or return to the homepage.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Return to Home
          </Button>
          <Button href="/contact" variant="secondary" size="md">
            Contact Support
          </Button>
        </div>
      </Container>
    </div>
  );
}
