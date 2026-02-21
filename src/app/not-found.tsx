import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export function generateMetadata() {
  return { title: "404" };
}

export default function NotFound() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>404</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Sorry, this page could not be found.</p>
        </CardContent>
      </Card>
    </div>
  );
}
