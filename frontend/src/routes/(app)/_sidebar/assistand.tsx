import AssistandPageTemplate from "@/modules/assistand/templates/assistand-page-template"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(app)/_sidebar/assistand")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <AssistandPageTemplate />
    </div>
  )
}
