SELECT anno, cnt, entities.name FROM (
  SELECT DISTINCT
    jsonb_object_keys(documents.references) AS anno,
    COUNT(*) OVER (PARTITION BY jsonb_object_keys(documents.references)) cnt
  FROM documents WHERE meta->>'state'='published' AND "references" ?& '{}'
) AS docs INNER JOIN entities ON (docs.anno = entities."entityId")
WHERE "entityType" = 'subject';