import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useSyncStorage = <T>(name: string, state: T, setState: Dispatch<SetStateAction<T>>) => {
    const [firstMount, setFirstMount] = useState(true);

    useEffect(() => {
           const data = window.localStorage.getItem(name);
           console.log('data', data)
           data && JSON.parse(data) && setState(JSON.parse(data) as T);
           setFirstMount(false);
    }, [firstMount]);

    useEffect(() => {
        if(!firstMount) {
            window.localStorage.setItem(name, JSON.stringify(state));
        }
    }, [state]);
}