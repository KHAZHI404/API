
export type OutputErrorsType = {
    errorsMessages: FieldError[];
}

type FieldError = {
    message: string | null;
    field: string | null;
}
