export type OutputErrorsType = {
    errorsMessages: FieldError[];
}

export type FieldError = {
    message: string | null;
    field: string | null;
}
