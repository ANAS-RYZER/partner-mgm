import { redirect } from "next/navigation";


export default function Home() {
  // const router = useRouter();
  // const { hasHydrated, isAuthenticated } = useAuthStore();

  // useEffect(() => {
  //   if (!hasHydrated) return;

  //   router.replace(isAuthenticated ? "/dashboard" : "/login");
  // }, [hasHydrated, isAuthenticated]);

  redirect("/dashboard");
  
}
