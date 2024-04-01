import { PrismaClient } from "@prisma/client"

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

const getEvent = async (req, res) => {
    let id = Number(req.params.id)

    const archivedEvent = await prisma.event.findFirst({
        where: {
            id: id,
            archived: true
        }
    })

    if (archivedEvent) {
        return res.status(400).json({ error: 'Event not available' })
    } else {
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

}

const searchEvent = async (req, res) => {// à fix
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

export { getEvents, getEvent, searchEvent, findAssociatedAsso }