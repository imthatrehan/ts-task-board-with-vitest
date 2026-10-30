import { describe, expect, it } from "vitest";
import formatDate from "./formatDate";

describe('formatDate utility',()=>{
    it('should format fixed timestamp correctly without timezone shifts',()=>{
        const fixedTimestamp = new Date('2026-10-15T12:00:00Z').getTime()
        const result = formatDate(fixedTimestamp)
        expect(result).contain('15')
        expect(result).toMatch(/[A-Za-z]+/)
    })
})