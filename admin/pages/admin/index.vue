<template>
  <v-container grid-list-md>
    <!-- <v-layout row wrap justify-space-around fill-height/> -->

    <v-layout row justify-space-around wrap fill-height>
      <v-flex xs12 md5>
        <v-card>
          <v-card-title >服务器状态</v-card-title>
          <v-container>
            <div class="server_status">
              <span>运行状态：</span>
              <v-chip :color="constants == 0 ? 'green' : 'red'" text-color="white" type="dot">{{ constants == 0 ? '服务器运行中' : '服务器出现错误' }}</v-chip>
            </div>
            <div class="server_status">
              <span>服务器发行版本：</span>
              <v-chip color="blue" text-color="white" checkable>{{ release }}</v-chip>
            </div>
            <div class="server_status">
              <span>Node.js编译运行系统平台：</span>
              <v-chip color="#495060" text-color="white">{{ platform }}</v-chip>
            </div>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12 md7>
        <v-card>
          <v-card-title>服务器信息
            <v-btn flat color="orange" href="#" @click.prevent="changeInit"> 
              刷新
            </v-btn>
          </v-card-title>  
          <v-container>
            <v-layout wrap justify="space-between">
              <v-flex xs12 md7>
                <div class="server_status">
                  <span>服务器主机名：</span>
                  <v-chip color="#495060" text-color="white">{{ hostname }}</v-chip>
                </div>
                <div class="server_status">
                  <span>操作系统：</span>
                  <v-chip color="#ff9900" text-color="white">{{ type }}</v-chip>
                </div>
                <div class="server_status">
                  <span>服务器总内存数：</span>
                  <v-chip color="#19be6b" text-color="white">{{ totalmem }}</v-chip>
                </div>
                <div class="server_status">
                  <span>服务器可用内存数：</span>
                  <v-chip color="#19be6b" text-color="white">{{ freemem }}</v-chip>
                </div>
              </v-flex>
              <v-flex xs12 md5>
                <div>
                  <v-progress-circular
                    :rotate="-90"
                    :size="200"
                    :width="4"
                    :value="percentage"
                    color="primary"
                  >
                    <h3>内存使用率</h3>
                    <p>综合服务器内存占比</p>
                    <span>
                      占用百分比
                      <i>{{ percentage }}%</i>
                    </span>
                  </v-progress-circular>
              
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>逻辑CPU内核信息</v-card-title>
        
          <v-data-table
            :headers="columns"
            :items="cpu"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.model }}</td>
              <td>{{ props.item.speed }}</td>
              <td>{{ props.item.times }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      constants: null,
      release: null,
      platform: null,
      hostname: null,
      type: null,
      freemem: null,
      totalmem: null,
      percentage: null,
      cpu: [],
      columns: [
        {
          text: 'CPU内核模型',
          value: 'model'
        },
        {
          text: 'CPU频率(GHz)',
          value: 'speed'
        },
        {
          text:
            'CPU执行模式[毫秒]( user:用户 | nice:良好 | sys:系统 | idle:空闲 | irq:中断 )',
          value: 'times'
        }
      ]
    }
  },
  created() {
    this.init()
    console.log(process.env.NODE_ENV)
  },
  methods: {
    init() {
      this.$axios.post('/system').then(res => {
        let {
          constants,
          release,
          platform,
          hostname,
          type,
          freemem,
          totalmem,
          percentage,
          cpu
        } = res.data
        ;[
          this.constants,
          this.release,
          this.platform,
          this.hostname,
          this.type,
          this.freemem,
          this.totalmem,
          this.percentage,
          this.cpu
        ] = [
          constants,
          release,
          platform,
          hostname,
          type,
          freemem,
          totalmem,
          percentage,
          cpu
        ]
      })
    },
    changeInit() {
      this.init()
    }
  }
}
</script>
