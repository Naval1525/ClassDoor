import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/api.ts"; 

const Authpopup = () => {
  const { createAnonymousSession } = useAuth();

  const handleCreate = () => {
    createAnonymousSession();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Create an Anonymous ID</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={handleCreate}>Create</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Authpopup;
