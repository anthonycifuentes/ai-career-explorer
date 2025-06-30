import Layout from "@/core/components/layout/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_sidebar")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Layout />;
}
