import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  loader: () => {
    redirect({
      to: "/assistand",
      throw: true,
    })
  },
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <h1>ASSISTAND</h1>
    </div>
  )
}
