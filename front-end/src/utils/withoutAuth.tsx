import { useAuth } from "@/hooks";
import { Box, Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { ComponentType } from "react";

export function withoutAuth(WrappedComponent: ComponentType<any>) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    if (!isLoading && user) {
      router.push("/");
    }

    if (isLoading)
      return (
        <Box sx={{ textAlign: "center" }}>
          <Loader sx={{ marginTop: "10rem" }} />
        </Box>
      );

    return !isLoading && !user && <WrappedComponent {...props} />;
  };
}
