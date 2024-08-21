import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return(
        <div className="h-screen flex justify-center items-center bg-gray-900">
            <SignUp afterSignUpUrl='/new-user' redirectUrl='/new-user'/>
        </div>
    );
}

export default SignUpPage