import { getPayload } from "payload";
import config from "@payload-config";

export function HomePage() {
  const payload = getPayload({ config });
  
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page content.</p>
    </div>
  );
}
