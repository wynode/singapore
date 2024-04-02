npm run build &&
npm run export &&
rsync -r deploy/nginx.sg.conf root@43.159.33.170:/data/singapore_ui/singapore_ui.nginx.conf
rsync -r out root@43.159.33.170:/data/singapore_ui