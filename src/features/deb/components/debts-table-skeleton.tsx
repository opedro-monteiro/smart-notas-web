import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COLUMN_COUNT = 5;
const ROW_COUNT = 6;

export function DebtsTableSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center py-4">
        <Skeleton className="h-9 w-64" />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow className="hover:bg-primary/90 border-primary-foreground/20">
              {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-20 bg-primary-foreground/30" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: ROW_COUNT }).map((_, row) => (
              <TableRow key={row}>
                {Array.from({ length: COLUMN_COUNT }).map((_, col) => (
                  <TableCell key={col}>
                    <Skeleton className="h-4 w-full max-w-[160px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}
