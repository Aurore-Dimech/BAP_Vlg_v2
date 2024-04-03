import { PrismaClient } from "@prisma/client"
import { verifyRole, verifyToken } from "./UserController.js"

const prisma = new PrismaClient()

const getEvents = (req, res) => {
    prisma.event.findMany({
        where: {
            archived: false
        },
        orderBy: {
            start_date: 'asc'
        }
    })
    .then((events) => {
        res.json(events)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getArchivedEvents = (req, res) => {
    verifyToken(req, res, ()=> {
        prisma.event.findMany({
            where: {
                archived: true
            },
            orderBy: {
                start_date: 'asc'
            }
        })
        .then((events) => {
            res.json(events)
        })
        .catch((error) => {
            res.json(error)
        })
    })
}

const getEvent = (req, res) => {
    let id = Number(req.params.id)

    prisma.event.findUnique({
        where : {
            id: id
        }
    })
    .then((event) => {
        res.json(event)
    })
    .catch((error) => {
        res.json(error)
    })
}

const createEvent = (req, res) => {
    verifyToken = async (req, res, next)=> {
        let event = req.body
    
        let startDate = new Date(event.start_date);
        let endDate = new Date(event.end_date);
        let archivedState = event.archived === 'true' ? true : false
    
        event.image = req.file ? req.file.path : undefined
    
        if (event.name === '' || event.start_date === '' || event.end_date === '' || event.id_association === 'none' || event.address === '' || event.town === '' || event.postal_code === '' || event.longitude === '' || event.latitude === ''){
            return res.status(400).json({ error: 'The name, start date, end date, association, address, town, postal code, longitude and latitude cannot be empty' })
        } else {
            prisma.event.create({
                data: {
                    name: event.name,
                    start_date: startDate.toISOString(),
                    end_date: endDate.toISOString(),
                    id_association: Number(event.id_association),
                    description: event.description,
                    image: event.image,
                    address: event.address,
                    complement_address: event.complement_address,
                    town: event.town,
                    postal_code: event.postal_code,
                    longitude: event.longitude,
                    latitude: event.latitude,
                    archived: archivedState
                }
            })
            .then((event) => {
                res.json(event)
            })
            .catch((error) => {
                res.json(error)
            }) 
        }
    }
}

const updateEvent = async (req, res) => {
    verifyToken = async (req, res, next)=> {
        let id = Number(req.params.id)
    
        let event = {
            name: req.body.name,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            id_association: req.body.id_association,
            description: req.body.description,
            image: req.body.image === 'REMOVE_IMAGE' ? null : (req.file ? req.file.path : undefined),
            address: req.body.address,
            complement_address: req.body.complement_address,
            town: req.body.town,
            postal_code: req.body.postal_code,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            archived: req.body.archived,
        }
    
        let startDate = new Date(event.start_date);
        let endDate = new Date(event.end_date);
        let archivedState = event.archived === 'true' ? true : false
    
        if (event.name === '' || event.start_date === '' || event.end_date === '' || event.id_association === '' || event.address === '' || event.town === '' || event.postal_code === '' || event.longitude === '' || event.latitude === ''){
            return res.status(400).json({ error: 'The name, start date, end date, association, address, town, postal code, longitude and latitude cannot be empty' })
        } else {
    
            await prisma.event.update({
                where : {
                    id: id
                },
                data: {
                    name: event.name,
                    start_date: startDate.toISOString(),
                    end_date: endDate.toISOString(),
                    id_association: Number(event.id_association),
                    description: event.description,
                    image: event.image,
                    address: event.address,
                    complement_address: event.complement_address,
                    town: event.town,
                    postal_code: event.postal_code,
                    longitude: event.longitude,
                    latitude: event.latitude,
                    archived: archivedState
                }
            })
            .then((event) => {
                res.json(event)
            })
            .catch((error) => {
                console.log(error)
                res.json(error)
            })
        }
    }
}

// const deleteEvent = (req, res) => {
//     let id = Number(req.params.id)

//     prisma.event.delete({
//         where : {
//             id: id
//         }
//     })
//     .then((event) => {
//         res.json(event)
//     })
//     .catch((error) => {
//         res.json(error)
//     })
// }

const deleteEvent = (req, res) => {
    verifyToken = async (req, res, next)=> {
        let id = Number(req.params.id)
    
        prisma.event.update({
            where : {
                id: id
            },
            data: {
                archived: true
            }
        })
        .then((event) => {
            res.json(event)
        })
        .catch((error) => {
            res.json(error)
        })
    }
}

const searchEvent = async (req, res) => {
    let input = req.params.searchInput
    

    await prisma.event.findMany({
        where : {
            archived: false,
            OR: [
                {
                    name: {contains: input}, 
                },
                // {
                //     start_date: {contains: input}, 
                // },
                {
                    //association ?
                },
                {
                    address: {contains: input}, 
                },
                {
                    town: {contains: input}
                }
            ]
        },
        orderBy: {
            name: 'asc',
        },
    })
    .then((event) => {
        res.json(event)
    })
    .catch((error) => {
        res.json(error)
    })
}

const verifyEventDate = async () => {
    const date = new Date();
    try{
        await prisma.event.updateMany({
            where : {
                archived: false,
                end_date: {
                    lt: date
                }
            },
            data: {
                archived: true
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const findAssociatedAsso = async (req, res) => {
    let id = Number(req.params.id)

    prisma.association.findUnique({
        where: {
            id: id,
            closed: false
        }
    })
    .then((asso) => {
        res.json(asso)
    })
    .catch((error) => {
        res.json(error)
    })
}


export { getEvents, getEvent, createEvent, updateEvent, deleteEvent, searchEvent, verifyEventDate, getArchivedEvents, findAssociatedAsso }