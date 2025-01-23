'use client'

import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

export const GitHubStars = () => {
    const [stars, setStars] = useState<number | null>(null)

    useEffect(() => {
        const fetchStars = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/simon-bonnedahl/logolab')
                const data = await response.json()
                setStars(data.stargazers_count)
            } catch (error) {
                console.error('Error fetching GitHub stars:', error)
            }
        }

        fetchStars()
    }, [])

    if (stars === null) return null

    return (
        <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{stars}</span>
        </div>
    )
}