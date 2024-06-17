import { Button } from "@/shadcn/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/components/ui/card"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/shadcn/components/ui/tabs"

export function ModalAuth() {
    return (
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Sign in with the account you have created.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="name">Pasword</Label>
                            <Input id="name" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="font-semibold hover:bg-white bg-white text-black hover:opacity-65">Sign In</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Create your account to get more features.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirm_password">Confirm Password</Label>
                            <Input id="confirm_password" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="font-semibold hover:bg-white bg-white text-black hover:opacity-65">Create an Account</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
