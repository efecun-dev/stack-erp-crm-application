export interface StaffDetails {
    type: string,
    dates: { start: string, end: string },
    status: "approved" | "declined"
}

export interface Staff {
    staff: { name: string, position: string, email: string },
    department: string,
    startDate: string,
    remains: string,
    status: "active" | "passive",

    items: StaffDetails[]
}