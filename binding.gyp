{  "targets": [
    {
      "target_name": "binding",
       'sources' : [  "<!@(node -p \"require('fs').readdirSync('./src').map(f=>'src/'+f).join(' ')\")" ],
    }
  ]
}