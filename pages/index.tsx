import { Inter } from "next/font/google"
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] })

export default function Main() {
  const { push } = useRouter();

  useEffect(() => {
     push('/home');
  }, []);
  
  return <p></p>;
}
