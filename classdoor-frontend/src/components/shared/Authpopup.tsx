import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth.api"; 

const Authpopup = () => {
  const { createAnonymousSession } = useAuth();

  const handleCreate = () => {
    createAnonymousSession();
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full bg-black max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-white">Create an Anonymous ID</CardTitle>
        </CardHeader>
        <CardContent className="flex  justify-center">
          <Button onClick={handleCreate} className="bg-black border-gray-100 border-2">Create</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Authpopup;
