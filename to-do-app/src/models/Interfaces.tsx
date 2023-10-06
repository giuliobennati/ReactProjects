export interface ITask{
    id: number | undefined;
    title: string;
    dateCreation: string;
    status: "Completed" | "Incompleted";
}

export type taskFilter = "All" | "Completed" | "Incompleted";