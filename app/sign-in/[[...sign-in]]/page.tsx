import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
    return(
        <div className="h-screen flex justify-center items-center bg-gray-900">
            <SignIn />
        </div>
    );
}

export default SignInPage