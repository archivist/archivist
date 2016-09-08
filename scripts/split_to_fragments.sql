DO
$BODY$
DECLARE
  myjson json;
  r json;
  map jsonb;
  anno text;
  annos text[];
BEGIN
  SELECT documents.data->'nodes' INTO myjson FROM documents WHERE document_id = 'doc_1';
  FOR r IN SELECT * FROM json_array_elements(myjson)
  LOOP
    IF r->>'type' = 'paragraph' THEN
      RAISE NOTICE 'paragraph %', r->>'content';
      annos = ARRAY(SELECT rec->'id' FROM json_array_elements(myjson) AS rec WHERE rec#>>'{path,0}' = r->>'id');
      RAISE NOTICE 'annotations %', annos;
    END IF;
  END LOOP;
END;
$BODY$ language plpgsql