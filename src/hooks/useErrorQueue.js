
import { useContext } from "react";
import { ErrorContext } from '../context/ErrorProvider'

export function useErrorQueue() {
    return useContext(ErrorContext);
}
export default useErrorQueue;