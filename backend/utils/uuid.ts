import { randomUUID } from "crypto"

export function generate_uuid(): string {
  return randomUUID()
}
