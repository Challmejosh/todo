"use client"
import { store } from "@/libs/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react"
import { Provider } from "react-redux";
import MiniLayout from "./MiniLayout";

export const client = new QueryClient()

const AppLayout = ({children}:{children:ReactNode})=>{
    return (
        <QueryClientProvider client={client}>
            <Provider store={store}>
                <MiniLayout>
                    {children}
                </MiniLayout>
            </Provider>
        </QueryClientProvider>
    )
}
export default AppLayout;