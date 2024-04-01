import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAssos = async (req, res) => {
    await prisma.association.findMany({
        where: {
            closed: false
        },
        orderBy: {
            name: 'asc',
        }
    })
    .then((assos) => {
        res.json(assos)
    })
    .catch((error) => {
        console.log(error)
        res.json(error)
    })
}

const getAssosByCategories = async (req, res) => {
    let category = req.params.category

    await prisma.association.findMany({
        where: {
            category: category,
            closed: false
        },
        orderBy: {
            name:'asc'
        }
    })
    .then((assos) => {
        res.json(assos)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getAsso = async (req, res) => {
    let id = Number(req.params.id)

    const closedAsso = await prisma.association.findFirst({
        where: {
            id: id,
            closed: true
        }
    })

    if (closedAsso) {
        return res.status(400).json({ error: 'Association not available' })
    } else {
        prisma.association.findUnique({
            where : {
                id: id
            }
        })
        .then((asso) => {
            res.json(asso)
        })
        .catch((error) => {
            res.json(error)
        })
    }
}

const searchAsso = async (req, res) => {
    let input = req.params.searchInput

    await prisma.association.findMany({
        where : {
            closed: false,
            OR: [
                {
                    name: {contains: input}, 
                },
                {
                    description: {contains: input}, 
                },
                {
                    category: {contains: input}, 
                },
                {
                    representative_name: {contains: input}, 
                },
                {
                    representative_surname: {contains: input}, 
                },
                {
                    address: {contains: input}, 
                },
            ]
        },
        orderBy: {
            name: 'asc',
        },
    })
    .then((asso) => {
        res.json(asso)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getEventsByAsso = async (req, res) => {
    let id = Number(req.params.id)

    prisma.event.findMany({
        where : {
            id_association: id,
            archived: false
        }
    })
    .then((asso) => {
        res.json(asso)
    })
    .catch((error) => {
        res.json(error)
    })    
}

export { getAssos, getAsso, searchAsso, getEventsByAsso, getAssosByCategories }