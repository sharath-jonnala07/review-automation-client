export default function RunsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Run History</h1>
        <p className="text-muted-foreground">
          View all past pulse runs and their status.
        </p>
      </div>

      <div className="rounded-md border">
        <div className="p-8 text-center text-muted-foreground">
          No runs yet. Runs will appear here after the first execution.
        </div>
      </div>
    </div>
  );
}
