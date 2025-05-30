import { auth } from "@/auth";
import { Button } from "antd";

export default async function Home() {
  const session = await auth()
  return (
    <div>helle world
      <div>
        <div>{JSON.stringify(session)}</div>
        <Button type="primary">test</Button>
      </div>
    </div>
  
  );
}
