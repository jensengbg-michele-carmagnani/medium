import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import logo from '../../public/googleLogo.png';
import {useRouter} from 'next/router'
const login = (props: { providers: any }) => {
  const { providers } = props;

  const { data: session } = useSession();

  
  const router = useRouter()

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black ">
        <img className="w-52 mb-5" src={logo.src} />
        <button
          onClick={() => signIn()}
          className="text-white  bg-blue-500 w-1/4 h-10 rounded-md"
        >
          Login
        </button>
      </div>
    );
  }
  if(session.user) {

    return router.replace('/')
  }
};

export default login;
