type Departments = {
    name: string;
    employees: Employees[];
}

type Employees = {
    firstName: string;
    lastName: string;
}

const pixellRiverEmployees: Departments[] = [
    {
        name: "Administration",
        employees: [
            {
                firstName: "Zoe",
                lastName: "Robins"
            },
            {
                firstName: "Madeleine",
                lastName: "Madden"
            },
        ]
    },
    {
        name: "Audit",
        employees: [
            {
                firstName: "Josha",
                lastName: "Sadowski"
            },
            {
                firstName: "Kate",
                lastName: "Fleetwood"
            }
        ]
    },
    {
        name: "Banking Operations",
        employees: [
            {
                firstName: "Priyanka",
                lastName: "Bose"
            },
            {
                firstName: "Hammed",
                lastName: "Animashaun"
            },
            {
                firstName: "Alvaro",
                lastName: "Morte"
            },
            {
                firstName: "Taylor",
                lastName: "Napier"
            },
            {
                firstName: "Alan",
                lastName: "Simmonds"
            }
        ]
    },
    {
        name: "Communications",
        employees: [
            {
                firstName: "Gil",
                lastName: "Cardinal"
            },
            {
                firstName: "Richard J.",
                lastName: "Lewis"
            },
        ]
    },
    {
        name: "Corporate Services",
        employees: [
            {
                firstName: "Randy",
                lastName: "Bradshaw"
            },
            {
                firstName: "Tracey",
                lastName: "Cook"
            },
            {
                firstName: "Lubomir",
                lastName: "Mykytiuk"
            }
        ]
    },
    {
        name: "Facilities",
        employees: [
            {
                firstName: "Dakota",
                lastName: "House"
            },
            {
                firstName: "Lori Lea",
                lastName: "Okemah"
            },
            {
                firstName: "Renae",
                lastName: "Morriseau"
            },
            {
                firstName: "Rick",
                lastName: "Belcourt"
            }
        ]
    },
    {
        name: "Financial Services",
        employees: [
            {
                firstName: "Selina",
                lastName: "Hanusa"
            },
            {
                firstName: "Buffy",
                lastName: "Gaudry"
            },
            {
                firstName: "Shaneen Ann",
                lastName: "Fox"
            },
            {
                firstName: "Allan",
                lastName: "Little"
            },
            {
                firstName: "Danny",
                lastName: "Rabbit"
            },
        ]
    },
    {
        name: "Human Resources",
        employees: [
            {
                firstName: "Jesse Ed",
                lastName: "Azure"
            },
            {
                firstName: "Stacy",
                lastName: "Da Silva"
            },
            {
                firstName: "Vladimir",
                lastName: "Valenta"
            },
            {
                firstName: "Samone",
                lastName: "Sayeses-Whitney"
            },
            {
                firstName: "Paul",
                lastName: "Coeur"
            }
        ]
    },
    {
        name: "Information Technology",
        employees: [
            {
                firstName: "Graham",
                lastName: "Greene"
            },
            {
                firstName: "Sandika",
                lastName: "Evergreen"
            },
            {
                firstName: "Jennifer",
                lastName: "Rodriguez"
            }
        ]
    },
    {
        name: "IT Technician",
        employees: [
            {
                firstName: "Aiyana",
                lastName: "Littlebear"
            },
            {
                firstName: "Inara",
                lastName: "Thunderbird"
            },
            {
                firstName: "Kaya",
                lastName: "Runningbrook"
            },
            {
                firstName: "Elara",
                lastName: "Firehawk"
            },
            {
                firstName: "Siona",
                lastName: "Moonflower"
            },
            {
                firstName: "Kaiyu",
                lastName: "Greywolf"
            },
            {
                firstName: "Ayawamat",
                lastName: "Nightwind"
            },
            {
                firstName: "Tala",
                lastName: "Braveheart"
            },
            {
                firstName: "Iniko",
                lastName: "Stonebear"
            },
            {
                firstName: "Onatah",
                lastName: "Redhawk"
            }
        ]
    }
]

function DepartmentsDisplay({
    departmentEmployees
}: {
    departmentEmployees: Departments[];
}) {
    return (
        <>
        <header>
            <h1>Pixell River Financial</h1>
        </header>
            <h2>Employees</h2>
            <ul>
                {departmentEmployees.map(department =>(
                    <li key={department.name}>
                        <strong>{department.name}</strong>
                            <ul>
                                {department.employees.map(employee => (
                                    <li key={`${department.name}-${employee.firstName}-${employee.lastName}`}>
                                        {employee.firstName} {employee.lastName}
                                    </li>
                                ))}
                            </ul>
                    </li>
                )
              )}
            </ul>
        </>
    )
}

export default function DepartmentsList () {
    return (
        <>
            <DepartmentsDisplay departmentEmployees={pixellRiverEmployees} />
        </>
    )
}